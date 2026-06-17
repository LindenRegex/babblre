{-# LANGUAGE ForeignFunctionInterface #-}
module Wrapper () where

import Text.Regex.TDFA
import Text.Regex.TDFA.String ()
import Data.Array (elems)
import Data.Char (ord)
import Data.List (intercalate)
import Text.Printf (printf)
import Data.IORef
import System.IO.Unsafe (unsafePerformIO)
import Foreign
import Foreign.C.String (peekCAStringLen)
import Foreign.C.Types (CInt(..))
import Control.Exception (try, evaluate, SomeException)

peekStr :: Ptr Word8 -> Int -> IO String
peekStr p n = peekCAStringLen (castPtr p, n)

esc :: String -> String
esc = concatMap e where
  e '"' = "\\\""; e '\\' = "\\\\"; e '\n' = "\\n"; e '\r' = "\\r"; e '\t' = "\\t"
  e c | ord c < 32 = printf "\\u%04x" (ord c)
      | otherwise  = [c]

matchJSON :: String -> String -> String
matchJSON pat inp =
  case makeRegexOptsM defaultCompOpt{ multiline = False } defaultExecOpt pat :: Maybe Regex of
    Nothing -> "{\"error\":\"invalid pattern\"}"
    Just re -> case matchOnce re inp of
      Nothing  -> "{\"matched\":false,\"groups\":[]}"
      Just arr -> "{\"matched\":true,\"groups\":[" ++ intercalate "," (map g (elems arr)) ++ "]}"
        where g (off, len) = if off < 0 then "null" else "[" ++ show off ++ "," ++ show (off + len) ++ "]"

{-# NOINLINE resultBuf #-}
resultBuf :: IORef (Ptr Word8)
resultBuf = unsafePerformIO (newIORef nullPtr)

packResult :: String -> IO (Ptr Word8)
packResult s = do
  let bytes = map (fromIntegral . ord) s :: [Word8]; n = length bytes
  p <- readIORef resultBuf >>= \old -> reallocBytes old (4 + n)
  writeIORef resultBuf p
  pokeByteOff p 0 (fromIntegral n :: Word32)        -- length prefix, wasm is little-endian
  pokeArray (p `plusPtr` 4) bytes
  pure p

engineCount :: IO CInt
engineCount = pure 1

engineInfo :: CInt -> IO (Ptr Word8)
engineInfo _ = packResult "{\"id\":\"regex-tdfa\",\"name\":\"regex-tdfa\",\"flavor\":\"POSIX tagged-DFA (full submatch)\",\"family\":\"POSIX\",\"version\":\"1.3.2.5\",\"url\":\"https://github.com/haskell-hvr/regex-tdfa\"}"

engineMatch :: CInt -> Ptr Word8 -> CInt -> Ptr Word8 -> CInt -> IO (Ptr Word8)
engineMatch _ pp pl ip il = do
  pat <- peekStr pp (fromIntegral pl)
  inp <- peekStr ip (fromIntegral il)
  r <- try (evaluate =<< (let s = matchJSON pat inp in length s `seq` pure s)) :: IO (Either SomeException String)
  packResult (either (\e -> "{\"error\":\"" ++ esc (show e) ++ "\"}") id r)

allocBuf :: CInt -> IO (Ptr Word8)
allocBuf n = mallocBytes (fromIntegral n)

deallocBuf :: Ptr Word8 -> CInt -> IO ()
deallocBuf p _ = free p

foreign export ccall "engine_count" engineCount :: IO CInt
foreign export ccall "engine_info"  engineInfo  :: CInt -> IO (Ptr Word8)
foreign export ccall "engine_match" engineMatch :: CInt -> Ptr Word8 -> CInt -> Ptr Word8 -> CInt -> IO (Ptr Word8)
foreign export ccall "alloc"   allocBuf   :: CInt -> IO (Ptr Word8)
foreign export ccall "dealloc" deallocBuf :: Ptr Word8 -> CInt -> IO ()

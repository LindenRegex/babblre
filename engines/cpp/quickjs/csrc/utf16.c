/* cutils.h is C-only (void* assignments), so wrap its converter for the C++ bridge */
#include "cutils.h"

size_t qjs_utf8_to_utf16(const char *src, size_t src_len, uint16_t *dest, size_t dest_len) {
  return utf8_decode_buf16(dest, dest_len, src, src_len);
}

/* utf8_encode emits lone surrogates as 3-byte sequences, so per-unit encoding is CESU-8 */
size_t qjs_utf16_to_cesu8(const uint16_t *src, size_t n, char *dest) {
  char *d = dest;
  for (size_t i = 0; i < n; i++) d += utf8_encode((uint8_t *)d, src[i]);
  return (size_t)(d - dest);
}

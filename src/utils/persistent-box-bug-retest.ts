/**
 * Returns whether a string reads the same forwards and backwards.
 */
export function isPalindrome(s: string): boolean {
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    if (s[left] !== s[right]) {
      return false;
    }
  }

  return true;
}

<?php

declare(strict_types=1);

namespace App;

/**
 * Pangrams, anagrams and palindromes
 */
class Checker implements CheckerInterface
{
    /**
     * A palindrome is a word, phrase, number, or other sequence of characters
     * which reads the same backward or forward.
     */
    public function isPalindrome(string $word): bool
    {
        $word = strtolower(trim($word));
        $word = str_replace(" ", "", $word);
        if ($word == "") {
            return false;
        }
        if (strrev($word) == $word) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * An anagram is the result of rearranging the letters of a word or phrase
     * to produce a new word or phrase, using all the original letters
     * exactly once.
     */
    public function isAnagram(string $word, string $comparison): bool
    {
        $word = strtolower(trim($word));
        if ($word == "") {
            return false;
        }
        $comparison = strtolower(trim($comparison));
        if (count_chars($word, 1) == count_chars($comparison, 1)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * A Pangram for a given alphabet is a sentence using every letter of the
     * alphabet at least once.
     */
    public function isPangram(string $phrase): bool
    {
        if ($phrase == "") {
            return false;
        }
        $phrase = strtolower(trim($phrase));
        $letters = str_split("abcdefghijklmnopqrstuvwxyz");
        foreach ($letters as $letter) {
            if (strpos($phrase, $letter) === false) {
                return false;
            }
        }
        return true;
    }
}

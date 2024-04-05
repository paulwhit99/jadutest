Weclome to Jadu test 


App name: Jadu test
customer: Jadu
Developer: Paul Whittington (paul@populate.co.uk)
Preview URL - https://jadutest.populate.co.uk/
Last update: April 4th 2024

Description:
A basic test to test the validity of 3 language tools: palindrome, anagram and pangram

Wrtten with PHP, javascript (Jquery)
Syphony is used for the server-side code, using twig templates
CSS was coded manually, without SASS etc becuase of the size of the porject.

The /templates/index,html.twig contains theress forms. Jquery hijacks the submission of these forms and submits them via an Ajax request to three endpoints /palindrom, /anagram and /pangram
These endpoints use a class created in /src/Checker.php to test the validity of the word/phrase and return a json object with a true/false value which the javascript then uses to render a message on top of the original form
Logically this validation could be performed in the browser with javascript but the breif required this to be done on the server with PHP

Requirements: php8+ - no special requirements.

Deployment : Pull from the git repository, run composer - no special requirements






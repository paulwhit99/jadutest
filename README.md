<h1>Weclome to Jadu test</h1> 
<ul>
<li>App name: Jadu test</li>
<li>Customer: None - Jadu</li>
<li>Developer: Paul Whittington (paul@populate.co.uk)</li>
<li>Preview URL - https://jadutest.populate.co.uk/</li>
<li>Last update: April 5th 2024</li>
</ul>
<p>
<b>Description:</b><br>
A basic test to test the validity of 3 language tools: palindrome, anagram and pangram<br>
</p>
<p>
Wrtten with PHP, javascript (Jquery).<br>
Syphony is used for the server-side code, using twig templates.<br>
CSS was coded manually, without SASS etc becuase of the small size of the project.<br>
Did not use boostrap/tailwind etc to demo hand coding.
</p>
<p>
The /templates/index,html.twig contains theress forms. Jquery hijacks the submission of these forms and submits them via an Ajax request to three endpoints /palindrom, /anagram and /pangram.<br>
These endpoints use a class created in /src/Checker.php to test the validity of the word/phrase and return a json object with a true/false value which the javascript then uses to render a message on top of the original form.<br>
Logically this validation could be performed in the browser with javascript but the brief required this to be done on the server with PHP.
</p>
<p>
Requirements: php8+ - no special requirements.
</p>
<p>
Deployment : Pull from the git repository, run composer - no special requirements
</p>





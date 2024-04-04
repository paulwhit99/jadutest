<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Checker;

class TestController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET', 'HEAD'])]
    public function home(): Response
    {
        return $this->render("index.html.twig");
    }
    #[Route('/palindrome', name: 'palindrome', methods: ['POST'])]
    public function palindrome(Request $request): JsonResponse
    {
        $myChecker = new Checker();
        return $this->json([
            'result' => $myChecker->isPalindrome($request->request->get('word'))
        ]);
    }
    #[Route('/anagram', name: 'anagram', methods: ['POST'])]
    public function anagram(Request $request): JsonResponse
    {
        $myChecker = new Checker();
        return $this->json([
            'result' => $myChecker->isAnagram($request->get('word'), $request->get('comparison'))
        ]);
    }
    #[Route('/pangram', name: 'pangram', methods: ['POST'])]
    public function pangram(Request $request): JsonResponse
    {
        $myChecker = new Checker();
        return $this->json([
            'result' => $myChecker->isPangram($request->request->get('phrase'))
        ]);
    }
}

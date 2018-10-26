<?php

namespace App\Controller;

use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RegistrationController extends Controller
{
    public function checkEmailAction(Request $request): JsonResponse
    {
        /** @var UserManagerInterface $userManager */
        $userManager = $this->container->get('fos_user.user_manager');
        $email = $request->get('email');
        $user = $userManager->findUserByEmail($email);

        return new JsonResponse(array('exist' => null !== $user));
    }

    public function checkUsernameAction(Request $request): JsonResponse
    {
        /** @var UserManagerInterface $userManager */
        $userManager = $this->container->get('fos_user.user_manager');
        $username = $request->get('username');
        $user = $userManager->findUserByUsername($username);

        return new JsonResponse(array('exist' => null !== $user));
    }
}

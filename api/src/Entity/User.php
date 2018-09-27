<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 * @ORM\Table(name="app_users")
 * @ApiResource(
 *     normalizationContext={"groups"={"user", "user:read"}},
 *     denormalizationContext={"groups"={"user", "user:write"}}
 * )
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     */
    protected $id;

    /**
     * @Groups({"user"})
     */
    protected $username;

    /**
     * @Groups({"user"})
     */
    protected $email;

    /**
     * @Groups({"user:write"})
     */
    protected $plainPassword;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"user"})
     */
    protected $lastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"user"})
     */
    protected $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"user"})
     */
    protected $fullname;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"user"})
     */
    private $birthDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"user"})
     */
    private $gender;

    public function setLastname(string $lastname): void
    {
        $this->lastname = $lastname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function setFirstname(string $firstname): void
    {
        $this->firstname = $firstname;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function setFullname(?string $fullname = null): void
    {
        $this->fullname = $fullname !== null ? $fullname : $this->firstname." ".$this->lastname;
    }

    public function getFullname(): string
    {
        return $this->fullname;
    }

    public function getBirthDate(): string
    {
        return $this->birthDate;
    }

    public function setBirthDate(string $birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    public function getGender(): string
    {
        return $this->gender;
    }

    public function setGender(string $gender): void
    {
        $this->gender = $gender;
    }

    public function isUser(?UserInterface $user = null): bool
    {
        return $user instanceof self && $user->id === $this->id;
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity
 * @ApiResource
 */
class State
{
    /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected $name;

    /**
     * @var City[]
     *
     * @ORM\OneToMany(targetEntity="City", mappedBy="state", fetch="EXTRA_LAZY", cascade={"persist"}, orphanRemoval=true)
     */
    protected $cities;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetimetz")
     * @Gedmo\Timestampable(on="create")
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetimetz")
     * @Gedmo\Timestampable(on="update")
     *
     */
    protected $updatedAt;

    /**
     * @throws \Exception
     */
    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
        $this->cities = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function addCity(City $city): void
    {
        if ($city->getState() !== $this) {
            $city->setState($this);
            $this->cities[] = $city;
        }
    }

    public function removeCity(City $city): void
    {
        if ($this === $city->getState()) {
            $this->cities->removeElement($city);
        }
    }

    public function getCities(): Collection
    {
        return $this->cities;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }
}

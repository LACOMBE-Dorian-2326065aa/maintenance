<?php

namespace App\Entity;

use App\Enum\SportTypeEnum;
use App\Repository\SportRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SportRepository::class)]
class Sport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(enumType: SportTypeEnum::class)]
    private SportTypeEnum $type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): SportTypeEnum
    {
        return $this->type;
    }

    public function setType(SportTypeEnum $type): static
    {
        $this->type = $type;

        return $this;
    }
}

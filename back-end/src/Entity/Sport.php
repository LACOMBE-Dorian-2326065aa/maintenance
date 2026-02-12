<?php

namespace App\Entity;

use App\Enum\SportTypeEnum;
use App\Repository\SportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @var Collection<int, Championship>
     */
    #[ORM\OneToMany(targetEntity: Championship::class, mappedBy: 'sport')]
    private Collection $championships;

    public function __construct()
    {
        $this->championships = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Championship>
     */
    public function getChampionships(): Collection
    {
        return $this->championships;
    }

    public function addChampionship(Championship $championship): static
    {
        if (!$this->championships->contains($championship)) {
            $this->championships->add($championship);
            $championship->setSport($this);
        }

        return $this;
    }

    public function removeChampionship(Championship $championship): static
    {
        if ($this->championships->removeElement($championship)) {
            // set the owning side to null (unless already changed)
            if ($championship->getSport() === $this) {
                $championship->setSport(null);
            }
        }

        return $this;
    }
}

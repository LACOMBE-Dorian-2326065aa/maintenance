<?php

declare(strict_types=1);

namespace App\Tests\Unit\Entity;

use App\Entity\Championship;
use App\Entity\Sport;
use App\Enum\SportTypeEnum;
use PHPUnit\Framework\TestCase;

class SportTest extends TestCase
{
    private Sport $sport;

    protected function setUp(): void
    {
        $this->sport = new Sport();
    }

    public function testCreateSportWithName(): void
    {
        $this->sport->setName('Football');
        $this->sport->setType(SportTypeEnum::COLLECTIVE);

        self::assertSame('Football', $this->sport->getName());
        self::assertSame(SportTypeEnum::COLLECTIVE, $this->sport->getType());
    }

    public function testSportHasEmptyChampionshipsOnConstruction(): void
    {
        self::assertCount(0, $this->sport->getChampionships());
    }

    public function testAddChampionshipToSport(): void
    {
        $championship = new Championship();
        $championship->setName('Ligue 1');

        $this->sport->addChampionship($championship);

        self::assertCount(1, $this->sport->getChampionships());
        self::assertSame($this->sport, $championship->getSport());
    }

    public function testRemoveChampionshipFromSport(): void
    {
        $championship = new Championship();
        $championship->setName('Ligue 1');

        $this->sport->addChampionship($championship);
        self::assertCount(1, $this->sport->getChampionships());

        $this->sport->removeChampionship($championship);
        self::assertCount(0, $this->sport->getChampionships());
    }
}

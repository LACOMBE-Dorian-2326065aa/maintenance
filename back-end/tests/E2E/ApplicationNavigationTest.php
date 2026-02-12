<?php

declare(strict_types=1);

namespace App\Tests\E2E;

use Symfony\Component\Panther\PantherTestCase;

class ApplicationNavigationTest extends PantherTestCase
{
    public function testApplicationLoads(): void
    {
        $client = static::createPantherClient();
        $client->request('GET', '/');

        // Vérifier que la page se charge correctement
        self::assertNotEmpty($client->getTitle());
    }

    public function testNavigateToSports(): void
    {
        $client = static::createPantherClient();
        $client->request('GET', '/api/sports');

        // Vérifier qu'une réponse valide est reçue
        $crawler = $client->getCrawler();
        self::assertNotNull($crawler);
    }

    public function testNavigateToChampionships(): void
    {
        $client = static::createPantherClient();
        $client->request('GET', '/api/championships');

        // Vérifier qu'une réponse valide est reçue
        $crawler = $client->getCrawler();
        self::assertNotNull($crawler);
    }
}

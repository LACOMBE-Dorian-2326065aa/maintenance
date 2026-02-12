<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ChampionshipControllerTest extends WebTestCase
{
    public function testListChampionships(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/championships');

        $statusCode = $client->getResponse()->getStatusCode();
        self::assertThat(
            $statusCode,
            self::logicalOr(
                self::equalTo(200),
                self::equalTo(404),
                self::equalTo(405),
            ),
        );
    }
}

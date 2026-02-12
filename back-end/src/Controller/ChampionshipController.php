<?php

namespace App\Controller;

use App\Entity\Championship;
use App\Entity\Sport;
use App\Repository\ChampionshipRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/championship')]
final class ChampionshipController extends AbstractController
{
    private ChampionshipRepository $championshipRepository;

    public function __construct(ChampionshipRepository $championshipRepository)
    {
        $this->championshipRepository = $championshipRepository;
    }

    #[Route('/{name}/{sport}', name: 'create_championship', methods: ['POST'])]
    public function createChampionship(string $name, Sport $sport): Response
    {
        $existing = $this->championshipRepository->findOneBy(['name' => $name]);
        if ($existing) {
            return $this->json(['message' => 'Championship already exists'], Response::HTTP_CONFLICT);
        }

        $championship = new Championship();
        $championship->setName($name)
                        ->setSport($sport)
        ;

        $this->championshipRepository->save($championship, true);

        return $this->json(['message' => 'Championship created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/{championship}', name: 'get_championship', methods: ['GET'])]
    public function getChampionship(Championship $championship): Response
    {
        return $this->json([
            'id' => $championship->getId(),
            'name' => $championship->getName(),
            'competitions_count' => $championship->getCompetitions()->count(),
        ], Response::HTTP_OK);
    }

    #[Route('', name: 'get_all_championships', methods: ['GET'])]
    public function getAllChampionships(): Response
    {
        $items = $this->championshipRepository->findAll();
        $data = [];

        foreach ($items as $c) {
            $data[] = [
                'id' => $c->getId(),
                'name' => $c->getName(),
                'competitions_count' => $c->getCompetitions()->count(),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/{championship}/{newName}', name: 'update_championship', methods: ['PUT'])]
    public function updateChampionship(Championship $championship, string $newName): Response
    {
        $championship->setName($newName);
        $this->championshipRepository->save($championship, true);

        return $this->json(['message' => 'Championship updated successfully'], Response::HTTP_OK);
    }

    #[Route('/{championship}', name: 'delete_championship', methods: ['DELETE'])]
    public function deleteChampionship(Championship $championship): Response
    {
        $this->championshipRepository->remove($championship, true);

        return $this->json(['message' => 'Championship deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/sport/{sport}', name: 'get_championship_sport', methods: ['GET'])]
    public function getSportChampionships(Sport $sport): Response
    {
        $championships = $sport->getChampionships();
        $data = [];

        foreach ($championships as $c) {
            $data[] = [
                'id' => $c->getId(),
                'name' => $c->getName(),
                'competitions_count' => $c->getCompetitions()->count(),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }
}

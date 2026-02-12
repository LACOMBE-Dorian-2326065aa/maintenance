<?php

namespace App\Controller;

use App\Entity\Championship;
use App\Entity\Competition;
use App\Repository\CompetitionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/competition')]
final class CompetitionController extends AbstractController
{
    private CompetitionRepository $competitionRepository;

    public function __construct(CompetitionRepository $competitionRepository)
    {
        $this->competitionRepository = $competitionRepository;
    }

    #[Route('/{name}/{championship}', name: 'create_competition', methods: ['POST'])]
    public function createCompetition(string $name, Championship $championship): Response
    {
        $existing = $this->competitionRepository->findOneBy([
            'name' => $name,
            'championship' => $championship,
        ]);
        if ($existing) {
            return $this->json(['message' => 'Competition already exists in this championship'], Response::HTTP_CONFLICT);
        }

        $competition = new Competition();
        $competition->setName($name)
                    ->setChampionship($championship)
        ;

        $this->competitionRepository->save($competition, true);

        return $this->json(['message' => 'Competition created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/{competition}', name: 'get_competition', methods: ['GET'])]
    public function getCompetition(Competition $competition): Response
    {
        $champ = $competition->getChampionship();

        return $this->json([
            'id' => $competition->getId(),
            'name' => $competition->getName(),
            'championship' => $champ ? ['id' => $champ->getId(), 'name' => $champ->getName()] : null,
            'events_count' => $competition->getEvents()->count(),
        ], Response::HTTP_OK);
    }

    #[Route('', name: 'get_all_competitions', methods: ['GET'])]
    public function getAllCompetitions(): Response
    {
        $items = $this->competitionRepository->findAll();
        $data = [];

        foreach ($items as $c) {
            $champ = $c->getChampionship();
            $data[] = [
                'id' => $c->getId(),
                'name' => $c->getName(),
                'championship' => $champ ? ['id' => $champ->getId(), 'name' => $champ->getName()] : null,
                'events_count' => $c->getEvents()->count(),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/championship/{championship}', name: 'get_competitions_by_championship', methods: ['GET'])]
    public function getCompetitionsByChampionship(Championship $championship): Response
    {
        $competitions = $championship->getCompetitions();
        $data = [];

        foreach ($competitions as $c) {
            $data[] = [
                'id' => $c->getId(),
                'name' => $c->getName(),
                'events_count' => $c->getEvents()->count(),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/{competition}/{newName}', name: 'update_competition', methods: ['PUT'])]
    public function updateCompetition(Competition $competition, string $newName): Response
    {
        $competition->setName($newName);
        $this->competitionRepository->save($competition, true);

        return $this->json(['message' => 'Competition updated successfully'], Response::HTTP_OK);
    }

    #[Route('/{competition}', name: 'delete_competition', methods: ['DELETE'])]
    public function deleteCompetition(Competition $competition): Response
    {
        $this->competitionRepository->remove($competition, true);

        return $this->json(['message' => 'Competition deleted successfully'], Response::HTTP_OK);
    }
}

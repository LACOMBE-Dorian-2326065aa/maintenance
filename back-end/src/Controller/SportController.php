<?php

namespace App\Controller;

use App\Entity\Sport;
use App\Enum\SportTypeEnum;
use App\Repository\SportRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/sport')]
final class SportController extends AbstractController
{
    private SportRepository $sportRepository;

    public function __construct(SportRepository $sportRepository)
    {
        $this->sportRepository = $sportRepository;
    }

    #[Route('/{name}/{type}', name: 'create_sport', methods: ['POST'])]
    public function createSport(
        string $name,
        string $type
    ): Response
    {
        $existingSport = $this->sportRepository->findOneBy(['name' => $name]);
        if ($existingSport) {
            return $this->json(['message' => 'Sport already exists'], Response::HTTP_CONFLICT);
        }

        if (!in_array($type, array_column(SportTypeEnum::cases(), 'value'))) {
            return $this->json(['message' => 'Invalid sport type'], Response::HTTP_BAD_REQUEST);
        }
        $sportType = SportTypeEnum::from($type);

        $sport = new Sport();
        $sport->setName($name)
                ->setType($sportType);

        $this->sportRepository->save($sport, true);

        return $this->json(['message' => 'Sport created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/{sport}', name: 'get_sport', methods: ['GET'])]
    public function getSport(
        Sport $sport
    ): Response
    {
        return $this->json([
            'id' => $sport->getId(),
            'name' => $sport->getName(),
            'type' => $sport->getType()->value,
        ], Response::HTTP_OK);
    }

    #[Route('', name: 'get_all_sports', methods: ['GET'])]
    public function getAllSports(): Response
    {
        $sports = $this->sportRepository->findAll();
        $data = [];

        foreach ($sports as $sport) {
            $data[] = [
                'id' => $sport->getId(),
                'name' => $sport->getName(),
                'type' => $sport->getType()->value,
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/{sport}/{newName}/{newType}', name: 'update_sport', methods: ['PUT'])]
    public function updateSport(
        Sport $sport,
        string $newName,
        string $newType
    ): Response
    {
        if (!in_array($newType, array_column(SportTypeEnum::cases(), 'value'))) {
            return $this->json(['message' => 'Invalid sport type'], Response::HTTP_BAD_REQUEST);
        }
        $sportType = SportTypeEnum::from($newType);

        $sport->setName($newName)
                ->setType($sportType);

        $this->sportRepository->save($sport, true);

        return $this->json(['message' => 'Sport updated successfully'], Response::HTTP_OK);
    }

    #[Route('/{sport}', name: 'delete_sport', methods: ['DELETE'])]
    public function deleteSport(
        Sport $sport
    ): Response
    {
        $this->sportRepository->remove($sport, true);

        return $this->json(['message' => 'Sport deleted successfully'], Response::HTTP_OK);
    }
}

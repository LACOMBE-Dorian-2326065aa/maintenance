<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Competition;
use App\Repository\EventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/event')]
final class EventController extends AbstractController
{
    private EventRepository $eventRepository;
    private EntityManagerInterface $em;

    public function __construct(EventRepository $eventRepository, EntityManagerInterface $em)
    {
        $this->eventRepository = $eventRepository;
        $this->em = $em;
    }

    #[Route('/{name}/{competition}', name: 'create_event', methods: ['POST'])]
    public function createEvent(string $name, Competition $competition): Response
    {
        $existing = $this->eventRepository->findOneBy([
            'name' => $name,
            'competition' => $competition,
        ]);
        if ($existing) {
            return $this->json(['message' => 'Event already exists in this competition'], Response::HTTP_CONFLICT);
        }

        $event = new Event();
        $event->setName($name)
              ->setCompetition($competition);

        $this->em->persist($event);
        $this->em->flush();

        return $this->json(['message' => 'Event created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/{event}', name: 'get_event', methods: ['GET'])]
    public function getEvent(Event $event): Response
    {
        $comp = $event->getCompetition();

        return $this->json([
            'id' => $event->getId(),
            'name' => $event->getName(),
            'competition' => $comp ? ['id' => $comp->getId(), 'name' => $comp->getName()] : null,
        ], Response::HTTP_OK);
    }

    #[Route('', name: 'get_all_events', methods: ['GET'])]
    public function getAllEvents(): Response
    {
        $items = $this->eventRepository->findAll();
        $data = [];

        foreach ($items as $e) {
            $comp = $e->getCompetition();
            $data[] = [
                'id' => $e->getId(),
                'name' => $e->getName(),
                'competition' => $comp ? ['id' => $comp->getId(), 'name' => $comp->getName()] : null,
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/competition/{competition}', name: 'get_events_by_competition', methods: ['GET'])]
    public function getEventsByCompetition(Competition $competition): Response
    {
        $events = $competition->getEvents();
        $data = [];

        foreach ($events as $e) {
            $data[] = [
                'id' => $e->getId(),
                'name' => $e->getName(),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/{event}/{newName}', name: 'update_event', methods: ['PUT'])]
    public function updateEvent(Event $event, string $newName): Response
    {
        $event->setName($newName);
        $this->em->flush();

        return $this->json(['message' => 'Event updated successfully'], Response::HTTP_OK);
    }

    #[Route('/{event}', name: 'delete_event', methods: ['DELETE'])]
    public function deleteEvent(Event $event): Response
    {
        $this->em->remove($event);
        $this->em->flush();

        return $this->json(['message' => 'Event deleted successfully'], Response::HTTP_OK);
    }
}

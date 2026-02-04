<?php

namespace App\Enum;

enum SportTypeEnum: string
{
    case INDIVIDUAL = 'Individuel';
    case COLLECTIVE = 'Collectif';
    case INDIVIDUAL_TEAM = 'Individuel en équipe';
}

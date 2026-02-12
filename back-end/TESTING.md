# Stratégie de Test - Backend Symfony

## Vue d'ensemble

Le backend Symfony utilise une stratégie de test à trois niveaux:

### 1. Tests Unitaires (Unit)
- **Framework**: PHPUnit
- **Répertoire**: `tests/Unit/`
- **Objectif**: Tester les classes et méthodes en isolation
- **Portée**: Logique métier, validations, transformations de données

```bash
composer test:unit
```

**Exemple**:
```php
// tests/Unit/ExampleTest.php
namespace App\Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testExample(): void
    {
        $this->assertTrue(true);
    }
}
```

### 2. Tests Fonctionnels (Functional)
- **Framework**: PHPUnit avec WebTestCase
- **Répertoire**: `tests/Functional/`
- **Objectif**: Tester les contrôleurs et les interactions avec la base de données
- **Portée**: Routes, réponses HTTP, intégration service

```bash
composer test:functional
```

**Exemple**:
```php
// tests/Functional/ExampleTest.php
namespace App\Tests\Functional;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ExampleTest extends WebTestCase
{
    public function testExample(): void
    {
        $client = static::createClient();
        $client->request('GET', '/');

        $this->assertResponseIsSuccessful();
    }
}
```

### 3. Tests E2E (End-to-End)
- **Framework**: Symfony Panther
- **Répertoire**: `tests/E2E/`
- **Objectif**: Tester l'application complète du point de vue utilisateur
- **Portée**: Parcours utilisateur complets, JavaScript, navigation

```bash
composer test:e2e
```

**Exemple**:
```php
// tests/E2E/ExampleTest.php
namespace App\Tests\E2E;

use Symfony\Component\Panther\PantherTestCase;

class ExampleTest extends PantherTestCase
{
    public function testExample(): void
    {
        $client = static::createPantherClient();
        $client->request('GET', '/');

        $this->assertStringContainsString('localhost', $client->getCurrentURL());
    }
}
```

## Commandes disponibles

### Tests
```bash
composer test              # Exécuter tous les tests
composer test:unit        # Exécuter les tests unitaires uniquement
composer test:functional  # Exécuter les tests fonctionnels uniquement
composer test:e2e         # Exécuter les tests E2E uniquement
```

### Linting avec PHP CS Fixer

#### Vérifier le style du code
```bash
composer lint
```

#### Corriger automatiquement le style du code
```bash
composer lint:fix
```

## Configuration

### PHPUnit (`phpunit.dist.xml`)
- Bootstrap: `tests/bootstrap.php`
- Extension: `Symfony\Component\Panther\ServerExtension`
- Environnement: `APP_ENV=test`
- Rapports de couverture: Configuration disponible pour ajouter la couverture de code

### PHP CS Fixer (`.php-cs-fixer.php`)
- Standard: PSR-12
- Répertoires analysés: `src/`, `tests/`
- Exclusions: `vendor/`, `var/`
- Cache: `.php-cs-fixer.cache`

### Panther (`.env.test`)
- Driver: Chrome ou Firefox
- Mode: Headless par défaut
- Chemins exécutables: Configurables selon votre système

## Bonnes pratiques

1. **Nommer les tests**: Utiliser des noms descriptifs (`testUserCanLoginWithValidCredentials`)
2. **Isolation**: Les tests unitaires ne doivent pas dépendre d'autres tests
3. **Assertions claires**: Utiliser des messages d'erreur explicites
4. **Database**: Les tests fonctionnels utilisent l'environnement de test (base de données dédiée)
5. **E2E modérés**: Limiter les tests E2E aux parcours utilisateur critiques

## Intégration Continue

Pour une intégration continue (CI/CD), exécuter:

```bash
composer lint          # Vérifier le style
composer test:unit    # Tests unitaires
composer test:functional # Tests fonctionnels
composer test:e2e     # Tests E2E
```

## Ressources

- [PHPUnit Documentation](https://phpunit.readthedocs.io/)
- [Symfony Testing](https://symfony.com/doc/current/testing.html)
- [Panther Documentation](https://github.com/symfony/panther)
- [PHP CS Fixer](https://github.com/friendsofphp/php-cs-fixer)

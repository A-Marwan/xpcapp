<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180927132005 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE app_users ADD lastname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE app_users ADD firstname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE app_users ADD birth_date VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE app_users ALTER fullname SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE app_users DROP lastname');
        $this->addSql('ALTER TABLE app_users DROP firstname');
        $this->addSql('ALTER TABLE app_users DROP birth_date');
        $this->addSql('ALTER TABLE app_users ALTER fullname DROP NOT NULL');
    }
}

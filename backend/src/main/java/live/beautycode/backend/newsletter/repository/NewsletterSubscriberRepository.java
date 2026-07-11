package live.beautycode.backend.newsletter.repository;

import live.beautycode.backend.newsletter.NewsletterSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, UUID> {

    boolean existsByEmail(String email);
}

package live.beautycode.backend.newsletter.service;

import live.beautycode.backend.newsletter.NewsletterSubscriber;
import live.beautycode.backend.newsletter.event.NewsletterSubscribedEvent;
import live.beautycode.backend.newsletter.repository.NewsletterSubscriberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public void subscribe(String email) {
        if (subscriberRepository.existsByEmail(email)) {
            return;
        }

        NewsletterSubscriber subscriber = new NewsletterSubscriber();
        subscriber.setEmail(email);
        subscriberRepository.save(subscriber);

        applicationEventPublisher.publishEvent(new NewsletterSubscribedEvent(email));
    }
}

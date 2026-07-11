package live.beautycode.backend.newsletter.listener;

import live.beautycode.backend.newsletter.event.NewsletterSubscribedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class NewsletterSubscriptionListener {

    @Async
    @EventListener
    public void onNewsletterSubscribed(NewsletterSubscribedEvent event) {
        log.info("Processing newsletter subscription for {}", event.email());
        // TODO: send welcome email / sync to mailing list provider
    }
}

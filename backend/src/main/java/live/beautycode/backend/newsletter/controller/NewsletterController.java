package live.beautycode.backend.newsletter.controller;

import live.beautycode.backend.newsletter.dto.SubscribeRequest;
import live.beautycode.backend.newsletter.service.NewsletterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
        path = "/api/newsletter",
        produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterService newsletterService;

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(@RequestBody SubscribeRequest request) {
        newsletterService.subscribe(request.email());
        return ResponseEntity.accepted().build();
    }
}

package backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.repository.CustomerRepository;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customers-count")
    public long getCustomersCount() {
        return customerRepository.count();
    }

    @GetMapping("/total-revenue")
    public double getTotalRevenue() {
        return customerRepository.findAll()
                .stream()
                .mapToDouble(c -> c.getTotalSpend() == null ? 0 : c.getTotalSpend())
                .sum();
    }
    @GetMapping("/premium-customers")
    public long getPremiumCustomers() {
        return customerRepository.findAll()
                .stream()
                .filter(c -> "Premium".equalsIgnoreCase(c.getCustomerSegment())
                || "Platinum".equalsIgnoreCase(c.getCustomerSegment()))
                .count();
        }
    @GetMapping("/segment-counts")
    public Map<String, Long> getSegmentCounts() {

    Map<String, Long> segmentCounts = new HashMap<>();

    customerRepository.findAll().forEach(customer -> {

        String segment = customer.getCustomerSegment();

        if (segment == null || segment.isEmpty()) {
            segment = "Unknown";
        }

        segmentCounts.put(
            segment,
            segmentCounts.getOrDefault(segment, 0L) + 1
        );
    });

    return segmentCounts;
}
}
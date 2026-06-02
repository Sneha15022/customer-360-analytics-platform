package backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String city;

    // Customer 360 fields
    private String source;
    private String customerSegment;
    private Double totalSpend;
    private Integer ordersCount;
    private String lastInteraction;

    public Customer() {
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // City
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Source
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    // Customer Segment
    public String getCustomerSegment() {
        return customerSegment;
    }

    public void setCustomerSegment(String customerSegment) {
        this.customerSegment = customerSegment;
    }

    // Total Spend
    public Double getTotalSpend() {
        return totalSpend;
    }

    public void setTotalSpend(Double totalSpend) {
        this.totalSpend = totalSpend;
    }

    // Orders Count
    public Integer getOrdersCount() {
        return ordersCount;
    }

    public void setOrdersCount(Integer ordersCount) {
        this.ordersCount = ordersCount;
    }

    // Last Interaction
    public String getLastInteraction() {
        return lastInteraction;
    }

    public void setLastInteraction(String lastInteraction) {
        this.lastInteraction = lastInteraction;
    }
}
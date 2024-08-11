package com.market.livemarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LivemarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(LivemarketApplication.class, args);
	}

}

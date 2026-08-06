package com.brocrewz.backend;

import com.brocrewz.backend.entity.ServicePlan;
import com.brocrewz.backend.entity.TeamMember;
import com.brocrewz.backend.entity.User;
import com.brocrewz.backend.repository.ServicePlanRepository;
import com.brocrewz.backend.repository.TeamMemberRepository;
import com.brocrewz.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class BrocrewzBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrocrewzBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(
			UserRepository userRepository,
			ServicePlanRepository servicePlanRepository,
			TeamMemberRepository teamMemberRepository,
			com.brocrewz.backend.repository.HomeSettingsRepository homeSettingsRepository,
			com.brocrewz.backend.repository.AboutSettingsRepository aboutSettingsRepository,
			PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByEmail("admin@brocrewz.com").isEmpty()) {
				User admin = User.builder()
						.email("admin@brocrewz.com")
						.password(passwordEncoder.encode("admin123"))
						.role("ADMIN")
						.build();
				userRepository.save(admin);
			}

			if (homeSettingsRepository.count() == 0) {
				homeSettingsRepository.save(com.brocrewz.backend.entity.HomeSettings.builder()
						.heroTitle("This isn't just editing.")
						.heroSubtitle("This is BroCrewz.")
						.heroDescription("We stand for Creative Editing, Visual Storytelling & YouTube Growth. Transforming raw footage into powerful stories.")
						.ctaPrimaryText("View Our Plans")
						.ctaPrimaryLink("/services")
						.build());
			}

			if (aboutSettingsRepository.count() == 0) {
				aboutSettingsRepository.save(com.brocrewz.backend.entity.AboutSettings.builder()
						.companyStory("Every late night, every revision, every frame has shaped who we are.")
						.mission("Together as brothers, we transform raw footage into powerful stories that leave an impact. We don't just cut clips together; we are editors, creators, and visual storytellers dedicated to YouTube Growth.")
						.build());
			}

			if (servicePlanRepository.count() == 0) {
				servicePlanRepository.saveAll(List.of(
					ServicePlan.builder().name("Single Video Editing").description("High quality video editing for a single video.").price(new BigDecimal("500.00")).planType("SINGLE").features("Professional Video Editing, Color Grading, Audio Enhancement").build(),
					ServicePlan.builder().name("Single Shorts Editing").description("Engaging short-form content editing.").price(new BigDecimal("200.00")).planType("SINGLE").features("Shorts Editing, Captions, Motion Graphics").build(),
					ServicePlan.builder().name("Thumbnail Design").description("Clickable, high-CTR thumbnail designs.").price(new BigDecimal("100.00")).planType("SINGLE").features("Custom Design, Source File").build(),
					ServicePlan.builder().name("Upload & Channel Management").description("Complete channel management.").price(new BigDecimal("200.00")).planType("SINGLE").features("SEO Optimization, Tags, Publishing").build(),
					ServicePlan.builder().name("Poster Design").description("High quality poster design.").price(new BigDecimal("300.00")).planType("SINGLE").features("Custom Design, High Resolution").build(),
					ServicePlan.builder().name("Flex Banner Design").description("Print-ready flex banner designs.").price(new BigDecimal("300.00")).planType("SINGLE").features("CMYK format, Print Ready").build(),
					ServicePlan.builder().name("Custom Frame Design").description("Custom frame designs for videos.").price(new BigDecimal("300.00")).planType("SINGLE").features("Custom UI, Brand Colors").build(),
					ServicePlan.builder().name("Logo Design").description("Professional brand identity.").price(new BigDecimal("500.00")).planType("SINGLE").features("Vector Files, Multiple Concepts").build(),
					ServicePlan.builder().name("20 Videos Plan").description("Monthly plan for 20 long-form videos.").price(new BigDecimal("7000.00")).planType("MONTHLY").features("20 Long Videos, Priority Support, Dedicated Editor").build(),
					ServicePlan.builder().name("20 Shorts Plan").description("Monthly plan for 20 shorts/reels.").price(new BigDecimal("3000.00")).planType("MONTHLY").features("20 Shorts, Viral Hooks, Quick Turnaround").build(),
					ServicePlan.builder().name("20 Videos + 20 Shorts").description("Combined monthly plan.").price(new BigDecimal("10000.00")).planType("MONTHLY").features("20 Videos, 20 Shorts, Premium Support").build(),
					ServicePlan.builder().name("Full Monthly Management").description("Complete channel takeover.").price(new BigDecimal("12000.00")).planType("MONTHLY").features("Editing, Thumbnails, Upload, Channel Management").build()
				));
			}

			if (teamMemberRepository.count() < 8) {
				teamMemberRepository.deleteAll();
				teamMemberRepository.saveAll(List.of(
					TeamMember.builder().name("Suresh P").role("Operations Manager & Web Lead").description("Designed and developed the BroCrewz Studio website, managing the technical architecture, frontend, backend, and digital platform.").phone(null).skills("Full Stack Web Development, System Architecture, UI/UX Design, Operations Management").imageUrl("/assets/team/suresh.jpg").category("TEAM").displayOrder(8).build(),
					TeamMember.builder().name("Lenin").role("Professional Video Editor (Lead)").description(null).phone("+91 81243 76230").skills("Professional Video Editing, YouTube Editing, Shorts Editing, Motion Graphics, Color Grading, Audio Enhancement").imageUrl("/assets/team/lenin.jpg").category("TEAM").displayOrder(1).build(),
					TeamMember.builder().name("Jerry").role("Video Editor (Pro)").description(null).phone(null).skills("Video Editing, YouTube Editing, Shorts Editing, Instagram Reels, Color Grading").imageUrl("/assets/team/jerry.jpg").category("TEAM").displayOrder(2).build(),
					TeamMember.builder().name("Sam").role("Video Editor (Pro)").description(null).phone(null).skills("Professional Editing, YouTube Editing, Reels Editing, Motion Graphics").imageUrl("/assets/team/sam.jpg").category("TEAM").displayOrder(3).build(),
					TeamMember.builder().name("Subbu").role("Video Editor (Pro)").description(null).phone(null).skills("Video Editing, YouTube Editing, Reels Editing, Shorts Editing").imageUrl("/assets/team/subbu.jpg").category("TEAM").displayOrder(4).build(),
					TeamMember.builder().name("Mukesh").role("Video Editor (Pro)").description(null).phone(null).skills("Video Editing, Motion Graphics, Color Correction").imageUrl("/assets/team/mukesh.jpg").category("TEAM").displayOrder(5).build(),
					TeamMember.builder().name("Vethams").role("Video Editor (Pro)").description(null).phone("+91 63803 64289").skills("Video Editing, YouTube Editing, Reels Editing, Shorts Editing, Motion Graphics").imageUrl("/assets/team/vethams.jpg").category("TEAM").displayOrder(6).build(),
					TeamMember.builder().name("Sujith").role("Video Editor (Pro)").description(null).phone(null).skills("Professional Editing, YouTube Editing, Shorts Editing, Color Correction").imageUrl("/assets/team/sujith.jpg").category("TEAM").displayOrder(7).build()
				));
			}
		};
	}
}

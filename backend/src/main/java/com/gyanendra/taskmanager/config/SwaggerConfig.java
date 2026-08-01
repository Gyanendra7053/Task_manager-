package com.gyanendra.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;


@Configuration
public class SwaggerConfig {


    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()
                .info(
                    new Info()
                        .title("Task Manager API")
                        .description("REST API for Task Manager Application")
                        .version("1.0")
                )
                .externalDocs(
                    new ExternalDocumentation()
                        .description("Project Documentation")
                )
                .addSecurityItem(
                    new SecurityRequirement()
                        .addList("Bearer Authentication")
                )
                .components(
                    new Components()
                        .addSecuritySchemes(
                            "Bearer Authentication",
                            new SecurityScheme()
                                .name("Bearer Authentication")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                        )
                );
    }
}
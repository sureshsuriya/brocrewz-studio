package com.brocrewz.backend.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
}

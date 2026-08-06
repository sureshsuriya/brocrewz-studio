package com.brocrewz.backend.dto;

public class PasswordResetConfirm {
    private String token;
    private String newPassword;

    public PasswordResetConfirm() {}

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}

package com.brocrewz.backend.dto;

public class AnalyticsTrackRequest {
    private String clientSessionId;
    private String pagePath;

    public AnalyticsTrackRequest() {}

    public String getClientSessionId() { return clientSessionId; }
    public void setClientSessionId(String clientSessionId) { this.clientSessionId = clientSessionId; }

    public String getPagePath() { return pagePath; }
    public void setPagePath(String pagePath) { this.pagePath = pagePath; }
}

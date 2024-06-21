package com.projectfortemplate.sslpinning;

public class RemoteConfig {

    private SSLConfig sslpinning;

    public RemoteConfig(SSLConfig sslpinning) {
        this.sslpinning = sslpinning;
    }

    public SSLConfig getSslpinning() {
        return sslpinning;
    }

    public void setSslpinning(SSLConfig sslpinning) {
        this.sslpinning = sslpinning;
    }
}

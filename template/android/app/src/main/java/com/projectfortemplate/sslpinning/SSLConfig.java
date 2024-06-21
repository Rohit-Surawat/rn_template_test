package com.projectfortemplate.sslpinning;

import java.util.ArrayList;

public class SSLConfig {

    private Boolean isEnabled;

    private ArrayList<CertificationModel> pinningArray;


    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public ArrayList<CertificationModel> getPinningArray() {
        return pinningArray;
    }

    public void setPinningArray(ArrayList<CertificationModel> pinningArray) {
        this.pinningArray = pinningArray;
    }
}

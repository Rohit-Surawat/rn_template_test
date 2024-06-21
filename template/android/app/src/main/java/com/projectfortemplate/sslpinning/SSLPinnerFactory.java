package com.projectfortemplate.sslpinning;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import java.util.ArrayList;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory  implements OkHttpClientFactory {
    public static boolean remoteCertificateAvailable=false;
    public static ArrayList<CertificationModel> remoteCertificates;
    public static void setRemoteCertificateAvailable(boolean value)
    {
        remoteCertificateAvailable=value;
    }

    public static void setRemoteCertificates(ArrayList<CertificationModel> list)
    {
        remoteCertificates=list;
    }


    public OkHttpClient createNewNetworkModuleClient() {
        try{
            if(remoteCertificateAvailable)
            {
                CertificatePinner.Builder builder= new CertificatePinner.Builder();
                for (CertificationModel model:remoteCertificates
                ) {
                    builder.add(model.getUrl(),model.getCertificate());
                }
                OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
                return clientBuilder
                        .certificatePinner(builder.build())
                        .build();
            }
            else
            {
                return null;
            }
        }
        catch(Exception e)
        {
            return null;
        }
    }
}

package com.projectfortemplate.sslpinning;

import android.os.AsyncTask;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;

public class SSLPinnerAsyncTask extends AsyncTask<String, String, SSLConfig> {

    private static final String TAG = "SSLPinnginTask";

    @Override
    protected SSLConfig doInBackground(String... strings) {
        try{
            ConfigLoader loader = new ConfigLoader();
            SSLConfig config= loader.getSSLConfig();
            return config;
        }
        catch(Exception e )
        {
            return null;
        }
    }

    @Override
    protected void onPreExecute()
    {

    }

    @Override
    protected void onPostExecute(SSLConfig ssl) {
        super.onPostExecute(ssl);
        try {
            if(ssl.getEnabled())
            {
                if (ssl.getPinningArray().size() > 0) {
                    SSLPinnerFactory.setRemoteCertificateAvailable(true);
                    SSLPinnerFactory.setRemoteCertificates(ssl.getPinningArray());
                    OkHttpClient factory =new SSLPinnerFactory().createNewNetworkModuleClient();
                    OkHttpClientProvider.setOkHttpClientFactory(new SSLPinnerFactory());
                }
            }
        } catch (Exception e) {
        }

    }
}

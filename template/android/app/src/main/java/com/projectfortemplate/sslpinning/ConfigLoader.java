package com.projectfortemplate.sslpinning;

import com.projectfortemplate.retrofit.ApiService;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
public class ConfigLoader {

    private static final String TAG = "ConfigLoader";


    public SSLConfig getSSLConfig()
    {
        try {


            Retrofit retrofit = new Retrofit.Builder().baseUrl("https://service.dev.realconnect.ae/").addConverterFactory(GsonConverterFactory.create()).build();
            ApiService apiService = retrofit.create(ApiService.class);
            Call<RemoteConfig> call = apiService.getConfig();
            Response<RemoteConfig> response = call.execute();
            return response.body().getSslpinning();
        }
        catch(Exception e)
        {
        }
        return null;
    }

}

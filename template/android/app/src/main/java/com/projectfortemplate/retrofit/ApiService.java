package com.projectfortemplate.retrofit;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Path;
import com.projectfortemplate.sslpinning.RemoteConfig;
public interface ApiService {

    @Headers({"Accept: application/json",
            "Ocp-Apim-Subscription-Key: 2284998cb0164f34b1626f0fa382749c",
            "Ocp-Apim-Trace: true",
            "Content-Type: application/json"
    })
    @GET("excomm-reporting/v1/config/retrieve")
    Call<RemoteConfig> getConfig();
}

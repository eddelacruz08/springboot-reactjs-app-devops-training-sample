package com.devops.training.backend.response;

import com.devops.training.backend.model.Items;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
    private int status;
    private String message;
    private Object data;

    public ApiResponse(int i, String message, Object object) {
        this.status = i;
        this.message = message;
        this.data = object;
    }
}

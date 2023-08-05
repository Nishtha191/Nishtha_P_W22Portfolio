package com.example.coffeetime.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class ErrorDto {
    @ApiModelProperty(example = "400")
    private int statusCode;
    @ApiModelProperty(example = "Customer Not Found")
    private String message;
    @ApiModelProperty
    private Instant timestamp;
    @ApiModelProperty(example = "API987654")
    private String applicationId;
}

package com.sonatrach.dz.CompilModule.platform.domain;

import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

import com.sonatrach.dz.CompilModule.servers.domain.Servers;

import lombok.Data;

@Entity
@Table(name ="EV_IDMS_IDMS_PLATFORM_DBASRVC")
@Data
public class Platform {
@Id
private Integer idplatform;
private String descplatform;
}

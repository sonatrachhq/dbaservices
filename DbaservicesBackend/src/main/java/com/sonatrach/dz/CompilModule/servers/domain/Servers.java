package com.sonatrach.dz.CompilModule.servers.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name ="SERVERS")
@Data
public class Servers {
@Id
private Integer idserver;
private String descserver;
private Integer idsubcategory;
private Integer idcategory;
private String ipadress;
}

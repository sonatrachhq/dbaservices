package com.sonatrach.dz.CompilModule.compilprivs.domain;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;

import lombok.Data;

@Entity
@Table(name = "COMPILEPRIVS")
@Data
@IdClass(CompilPrivsID.class)
@NamedQueries({@NamedQuery(name = "CompilPrivs.findByUserId", query = "SELECT p FROM CompilPrivs p WHERE iduseridms=?1 "),

})
public class CompilPrivs {
	@Id
	@Column(name = "idapplication")
	private Integer idapplication;
	@Id
	@Column(name = "iduseridms")
	private Integer iduseridms;
	@ManyToOne
	@JoinColumn(name = "idapplication", insertable = false, updatable = false)
	private Applications application;

	

}

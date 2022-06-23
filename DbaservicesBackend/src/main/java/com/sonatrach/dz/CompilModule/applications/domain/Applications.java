package com.sonatrach.dz.CompilModule.applications.domain;

import java.sql.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.sonatrach.dz.CompilModule.servers.domain.Servers;

import lombok.Data;

@Entity
@Table(name = "APPLICATIONS")
@Data
public class Applications {
	@Id
	private Integer idapplication;
	private String applicationtitle;
	private String applicationdesc;
	
	private Integer applicationstatus;
	private Integer applicationmode;
	private String compilename;
	private String scfname;
	@ManyToOne
	@JoinColumn(name = "idserver", insertable = false, updatable = false)
	private Servers server;


	

	
}

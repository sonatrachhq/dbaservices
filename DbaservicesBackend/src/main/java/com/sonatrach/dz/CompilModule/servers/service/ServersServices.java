package com.sonatrach.dz.CompilModule.servers.service;

import java.util.ArrayList;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;
import com.sonatrach.dz.CompilModule.servers.domain.Servers;
import com.sonatrach.dz.CompilModule.servers.repo.ServersRepo;

import lombok.Data;

@Service
@Transactional

public class ServersServices {
@Autowired
ServersRepo serversRepo;

public List<Servers> getServers() {
	List<Servers> servers=new ArrayList();
	try {
		servers= serversRepo.findAll();
	}catch(Exception e) {
		
	}
	return servers;
}
}

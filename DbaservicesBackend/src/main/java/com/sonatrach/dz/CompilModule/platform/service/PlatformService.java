package com.sonatrach.dz.CompilModule.platform.service;

import java.util.ArrayList;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sonatrach.dz.CompilModule.platform.domain.Platform;
import com.sonatrach.dz.CompilModule.platform.repo.PlatformRepo;
import com.sonatrach.dz.CompilModule.servers.domain.Servers;

@Service
@Transactional
public class PlatformService {
	
private static final Logger log = LoggerFactory.getLogger(PlatformService.class);

@Autowired
PlatformRepo platformRepo;





public List<Platform> getAllPlatforms() {
	List<Platform> platforms=new ArrayList();
	try {
		platforms= platformRepo.findAll();
	}catch(Exception e) {
		log.error("Exception in PlatformService ==> getAllPlatforms()  :"+e.getMessage());
	}
	
	return platforms;
}
}

package com.sonatrach.dz.CompilModule.applications.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;
import com.sonatrach.dz.CompilModule.applications.repo.ApplicationsRepo;
import com.sonatrach.dz.CompilModule.platform.service.PlatformService;



@Service
@Transactional
public class ApplicationsService {
	
private static final Logger log = LoggerFactory.getLogger(ApplicationsService.class);	
	
@Autowired
ApplicationsRepo appRepo;



public List<Applications> getAllApps(){
	List<Applications> apps=new ArrayList();
	try {
		apps= appRepo.findAll();
	}catch(Exception e) {
		log.error("Exception  getAllApps() in ApplicationsService==>" + e.getMessage());
	}
	return apps;
}



}

package com.sonatrach.dz.CompilModule.compilprivs.service;

import java.util.ArrayList;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;
import com.sonatrach.dz.CompilModule.applications.service.ApplicationsService;
import com.sonatrach.dz.CompilModule.compilprivs.domain.CompilPrivs;
import com.sonatrach.dz.CompilModule.compilprivs.repo.CompilPrivsRepo;

@Service
public class CompilPrivsService {
private static final Logger log = LoggerFactory.getLogger(CompilPrivsService.class);	
@Autowired
CompilPrivsRepo compilPrivsRepo;


public List<CompilPrivs> getCompilPrivs(Integer userId){
	List<CompilPrivs> compilPrivs=new ArrayList();
	try {
		compilPrivs= compilPrivsRepo.findByUserId(userId);
		//compilPrivs.
	}catch(Exception e) {
		log.error("Exception  getAllCompilPrivs() in CompilPrivsService==>" + e.getMessage());
	}
	return compilPrivs;
}
}

package com.sonatrach.dz.CompilModule.applications.repo;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;



@Repository
public interface ApplicationsRepo extends JpaRepository<Applications, Integer > {

}

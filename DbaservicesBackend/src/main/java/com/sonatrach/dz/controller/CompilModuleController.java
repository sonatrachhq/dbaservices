package com.sonatrach.dz.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonatrach.dz.CompilModule.applications.domain.Applications;
import com.sonatrach.dz.CompilModule.applications.service.ApplicationsService;
import com.sonatrach.dz.CompilModule.compilprivs.domain.CompilPrivs;
import com.sonatrach.dz.CompilModule.compilprivs.service.CompilPrivsService;
import com.sonatrach.dz.CompilModule.helpers.CompilFormRequest;
import com.sonatrach.dz.CompilModule.helpers.CompilFormResponse;
import com.sonatrach.dz.CompilModule.helpers.CompilResult;
import com.sonatrach.dz.CompilModule.platform.domain.Platform;
import com.sonatrach.dz.CompilModule.platform.service.PlatformService;
import com.sonatrach.dz.CompilModule.servers.domain.Servers;
import com.sonatrach.dz.CompilModule.servers.service.ServersServices;

@RestController
@CrossOrigin(origins = "*")
public class CompilModuleController {
	private static final Logger log = LoggerFactory.getLogger(CompilModuleController.class);
	 private static String OS = System.getProperty("os.name").toLowerCase();
	@Value("${s.compil.path}")
	private String s_compil_path ;
	
	
	@Autowired
	ServersServices serversService;
	@Autowired
	PlatformService platformService;
	@Autowired
	ApplicationsService appService;
	@Autowired
	CompilPrivsService compilPrivsService;
	
	@GetMapping("hello")
	public String helloWorld(@RequestParam(value="name", defaultValue="World") String name) {
		
		log.error("hello");
		return "Hello "+name+"!!";
	}
	
	@GetMapping("getAllServers")
	public List<Servers> getAllServers(){
		try {
			
			return serversService.getServers();
		}catch(Exception e) {
			log.error("getAllServers Exception in CompilModuleController ==>"+e.getMessage());
		}
		return null;
	}
	
	@GetMapping("getAllPlatforms")
	public List<Platform> getAllPlatforms(){
		try {
			return platformService.getAllPlatforms();
			
		}catch(Exception e) {
			log.error("getAllPlatforms Exception in CompilModuleController ==>"+e.getMessage());
		}
		return null;
	}
	
	
	@GetMapping("getAllCompilPrivs")//getCompilPrivs
	public List<CompilPrivs> getAllCompilPrivs(@RequestParam Integer userId){
		try {
		return compilPrivsService.getCompilPrivs(userId);
		}catch(Exception e) {
			log.error("getAllCompilPrivs Exception in CompilModuleController ==>"+e.getMessage());
		}
		return null;
	}
	
	@PostMapping("user/getAllApps")
	public List<Applications> getAllApps(){
		try {
			
			return appService.getAllApps();
		}catch(Exception e) {
			log.error("getAllApps Exception in CompilModuleController ==>"+e.getMessage());
		}
		return null;
	}
	
	@PostMapping("compilApplication")
	public CompilFormResponse compilApplication( @RequestBody CompilFormRequest compilForm) { //
		try {
			compilApp(compilForm.getUsername(),compilForm.getPsw(),compilForm.getServeripadress(),compilForm.getApplicationtitle());
			return new CompilFormResponse(200,"success");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			log.error("compilApplication Exception in CompilModuleController ==>"+e.getMessage());
		}catch(Exception e) {
			log.error("compilApplication Exception in CompilModuleController ==>"+e.getMessage());
		}
		return new CompilFormResponse(400,"failure");
	}
	
	public void compilApp(String username,String psw,String serverIpAdress,String appTitle) throws FileNotFoundException {
		File file = new File("");
		  if (isWindows()) {
			   file = ResourceUtils.getFile("classpath:compilApp.bat");
	        } else if (isUnix()) {
	        	file = ResourceUtils.getFile("classpath:compilApp.sh");
	        } 
		
		ProcessBuilder processBuilder = new ProcessBuilder(file.getAbsolutePath(),serverIpAdress,appTitle);

		try {

			Process process = processBuilder.start();

			StringBuilder output = new StringBuilder();

			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

			String line;
			while ((line = reader.readLine()) != null) {
				// System.out.println(line);
				output.append(line + "\n");
			}

			int exitVal = process.waitFor();
			// System.out.println(exitVal);
			if (exitVal == 0) {
				
				 System.out.println(output);
				 //System.exit(0);

			} else {
				// abnormal...
				 System.out.println("prob"+exitVal);
			}

		} catch (IOException e) {
			log.error(e.getMessage() + "compilApp");
		} catch (InterruptedException e) {
			log.error(e.getMessage() + "compilApp");
		} catch (Exception e) {
			log.error(e.getMessage() + "compilApp");
		}

	}
	
	
	@GetMapping("checkCompil")
	public Boolean checkCompil(@RequestParam String appName) {
		log.info("s_compil_path     :  "+s_compil_path.replace("/", File.separator)+File.separator+appName+".lck");
		s_compil_path=s_compil_path.replace("/", File.separator);
		try {
			File compil_path_file=new File(s_compil_path+File.separator+appName+".lck");
			if(compil_path_file.exists()) {
				
				return true;
			}else {
				return false;
			}
			
		}catch(Exception e) {
			log.error("checkCompil Exception in CompilModuleController ==>"+e.getMessage());
		}
		return null;
	}
	
	 public static boolean isWindows() {
	        return (OS.indexOf("win") >= 0);
	    }

	   

	    public static boolean isUnix() {
	        return (OS.indexOf("nix") >= 0
	                || OS.indexOf("nux") >= 0
	                || OS.indexOf("aix") > 0);
	    }
	@PostMapping("getCompilResult")
	public List<CompilResult> getCompilResult(@RequestBody Applications app) {
		
		log.info("s_compil_path     :   "+s_compil_path.replace("/", File.separator));
		List<CompilResult> compilResult=new ArrayList();
		s_compil_path=s_compil_path.replace("/", File.separator);
		try {
			File compil_path_file=new File(s_compil_path);
			if(compil_path_file.exists()) {
				File compiledAppFile=new File(s_compil_path+File.separator+ app.getApplicationtitle());
				if(compiledAppFile.exists()) {
					
					File lastBackup=getLatestFilefromDir(s_compil_path+File.separator+ app.getApplicationtitle()+File.separator+"backups");
					if(lastBackup!=null) {
						File formsFile=new File(lastBackup.getAbsolutePath()+File.separator+"forms");
						File[] allFiles = formsFile.listFiles();//un tableau qui contient les fichiers du formsFile

						for(int i=0;i<allFiles.length;i++) {
						 
						  if(getFileExtension(allFiles[i]).equals(".err")) { 
							String content=readFileContent(allFiles[i]);
							if(content!=null) { 
								CompilResult result=new CompilResult(allFiles[i].getName(),content);
								compilResult.add(result);
						  }
						}
						 
					}
						
					}	
					
						
						
						return compilResult;
					}
				}
			
		}catch(Exception e) {
			log.error(e.getMessage() + "    ==>getCompilResult");
		}
		
		return null;
	}
	private File getLatestFilefromDir(String dirPath){
	    File dir = new File(dirPath);
	    File[] files = dir.listFiles();
	    if (files == null || files.length == 0) {
	        return null;
	    }

	    File lastModifiedFile = files[0];
	    for (int i = 1; i < files.length; i++) {
	       if (lastModifiedFile.lastModified() < files[i].lastModified()) {
	           lastModifiedFile = files[i];
	       }
	    }
	    return lastModifiedFile;
	}
	private String getFileExtension(File file) {
	    String name = file.getName();
	    int lastIndexOf = name.lastIndexOf(".");
	    if (lastIndexOf == -1) {
	        return ""; // empty extension
	    }
	    return name.substring(lastIndexOf);
	}
	
	private String readFileContent(File file) {
		try {
		// Créer l'objet File Reader
	      FileReader fr = new FileReader(file);  
	      // Créer l'objet BufferedReader        
	      BufferedReader br = new BufferedReader(fr);  
	      StringBuffer sb = new StringBuffer();    
	      String line;
	      while((line = br.readLine()) != null)
	      {
	        // ajoute la ligne au buffer
	        sb.append(line);      
	        sb.append("\n");     
	      }
	      fr.close();    
			/*
			 * log.info("Contenu du fichier: "); System.out.println(sb.toString());
			 */
	      return sb.toString();
	      
	}catch(IOException e) {
		log.error(e.getMessage() + "readFileContent");
	}catch(Exception e) {
		log.error(e.getMessage() + "readFileContent");
	}
		return null;
	}
}

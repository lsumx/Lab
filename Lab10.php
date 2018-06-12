<?php
//Fill this place

//****** Hint ******
//connect database and fetch data here
$servername = "127.0.0.1";
$username = "root";
$password = "123456";
$conn = new mysqli($servername, $username, $password);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    
    

    <link rel="stylesheet" href="css/captions.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.css" />    

</head>

<body>
    <?php include 'header.inc.php'; ?>
    


    <!-- Page Content -->
    <main class="container">
        <div class="panel panel-default">
          <div class="panel-heading">Filters</div>
          <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">
              <div class="form-inline">
              <select name="continent" class="form-control">
                <option value="0">Select Continent</option>
                <?php
                //Fill this place

                //****** Hint ******
                //display the list of continents
                $sql = 'SELECT ContinentCode, ContinentName FROM continents';
                mysqli_select_db($conn , 'travel');
                $result =mysqli_query($conn,$sql);

                while($row = $result->fetch_assoc()) {
                  echo '<option value=' . $row['ContinentCode'] . '>' . $row['ContinentName'] . '</option>';
                }

                ?>
              </select>     
              
              <select name="country" class="form-control">
                <option value="0">Select Country</option>
                <?php 
                //Fill this place
                $sql2 = 'SELECT ISO, CountryName FROM countries';
                mysqli_select_db($conn , 'travel');
                $result2 =mysqli_query($conn,$sql2);
                while($row2 = $result2->fetch_assoc()) {
                    echo '<option value=' . $row2['ISO'] . '>' . $row2['CountryName'] . '</option>';
                }
                //****** Hint ******
                /* display list of countries */ 
                ?>
              </select>    
              <input type="text"  placeholder="Search title" class="form-control" name=title>
              <button type="submit" class="btn btn-primary">Filter</button>
              </div>
            </form>

          </div>
        </div>     
                                    

		<ul class="caption-style-2">
            <?php
            $sql3 = 'SELECT * FROM imagedetails ';
            mysqli_select_db($conn , 'travel');
            $result3 =mysqli_query($conn,$sql3);
            while ($row3 = $result3->fetch_assoc()) {
                $content ='<li><a href="detail.php?id='.$row3['ImageID'].'" class="img-responsive"><img src="images/square-medium/'.$row3['Path'].'" alt="'.$row3['Title'].'"><div class="caption"><div class="blur"></div><div class="caption-text"><p>'.$row3['Title'].'</p></div></div></a></li>';
                if (isset($_GET['continent']) &&isset($_GET['country'])){
                    if ($_GET['country']==$row3['CountryCodeISO'] && $_GET['country']!='0'){
                        echo $content;
                    }
                    elseif ($row3['ContinentCode'] ==$_GET['continent']&& $_GET['continent']!='0'){
                        echo $content;
                    }
                }
                else
                    echo $content;
            }


            //****** Hint ******
            /* use while loop to display images that meet requirements ... sample below ... replace ???? with field data
            <li>
              <a href="detail.php?id=????" class="img-responsive">
                <img src="images/square-medium/????" alt="????">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>????</p>
                  </div>
                </div>
              </a>
            </li>        
            */ 
            ?>
       </ul>       

      
    </main>
    
    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>            
        </div>
        

    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>
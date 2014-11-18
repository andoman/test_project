<?php
if(!empty($_POST))
{
	if(!empty($_POST['data']))
	{
		$obj = json_decode($_POST['data']);
		echo var_dump($obj);
		if(isset($obj->id))
		{
			echo $obj->id;
			$contents = file_get_contents('data.txt');
			$contents = preg_replace('/'.$obj->id.' .* .* .*\n/', $obj->id.' '.$obj->name.' '.$obj->desc.' '.$obj->done."\n", $contents);
			echo $contents;
			file_put_contents('data.txt', $contents);
		}
		else
		{
			$myfile = fopen('data.txt', 'a') or die('Unable to open file!');
			$id = rand(1,1000000);
			$stringData = $id.' '.$obj->name.' '.$obj->desc.' '.$obj->done."\n";
			fwrite($myfile, $stringData);
			fclose($myfile);
		}
	}
	else if(!empty($_POST['del']))
	{
		$id = $_POST['del'];
		echo $id;
		$contents = file_get_contents('data.txt');
		$contents = preg_replace('/\n'.$id.' .* .*/', '', $contents);
		echo $contents;
		file_put_contents('data.txt', $contents);
	}
}
else
{
	$myfile = fopen('data.txt', 'r') or die('Unable to open file!');
	$outArr = [];
	while(!feof($myfile)) {
		$line = fgets($myfile);
		$explodedArr = explode(' ',$line);
		if(count($explodedArr)>3)
			$outArr[] = array('id'=>$explodedArr[0], 'name'=>$explodedArr[1], 'desc'=>$explodedArr[2], 'done'=>trim($explodedArr[3]));
	}
	fclose($myfile);
	echo json_encode($outArr);
}
?>